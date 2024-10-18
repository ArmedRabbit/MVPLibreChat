import { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import type { ConversationListResponse } from 'librechat-data-provider';
import {
  useLocalize,
  useHasAccess,
  useMediaQuery,
  useAuthContext,
  useConversation,
  useLocalStorage,
  useNavScrolling,
  useConversations,
} from '~/hooks';
import { useConversationsInfiniteQuery } from '~/data-provider';
import { Conversations } from '~/components/Conversations';
// import BookmarkNav from './Bookmarks/BookmarkNav';
import AccountSettings from './AccountSettings';
import ProjectMenu from './ProjectMenu';
import { useSearchContext } from '~/Providers';
import { Spinner } from '~/components/svg';
import SearchBar from './SearchBar';
import NavToggle from './NavToggle';
import NewChat from './NewChat';
import { cn } from '~/utils';
import store from '~/store';

const Nav = ({
  navVisible,
  setNavVisible,
}: {
  navVisible: boolean;
  setNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const localize = useLocalize();
  const { conversationId } = useParams();
  const { isAuthenticated } = useAuthContext();

  const [navWidth, setNavWidth] = useState('400px');
  const [isHovering, setIsHovering] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [newUser, setNewUser] = useLocalStorage('newUser', true);
  const [isToggleHovering, setIsToggleHovering] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  const hasAccessToBookmarks = useHasAccess({
    permissionType: PermissionTypes.BOOKMARKS,
    permission: Permissions.USE,
  });

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      const savedNavVisible = localStorage.getItem('navVisible');
      if (savedNavVisible === null) {
        toggleNavVisible();
      }
      setNavWidth('500px');
    } else {
      setNavWidth('400px');
    }
  }, [isSmallScreen]);

  const { newConversation } = useConversation();
  const [showLoading, setShowLoading] = useState(false);
  const isSearchEnabled = useRecoilValue(store.isSearchEnabled);

  const { refreshConversations } = useConversations();
  const { pageNumber, searchQuery, setPageNumber, searchQueryRes } = useSearchContext();
  const [tags, setTags] = useState<string[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useConversationsInfiniteQuery(
      {
        pageNumber: pageNumber.toString(),
        isArchived: false,
        tags: tags.length === 0 ? undefined : tags,
      },
      { enabled: isAuthenticated },
    );
  useEffect(() => {
    // When a tag is selected, refetch the list of conversations related to that tag
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);
  const { containerRef, moveToTop } = useNavScrolling<ConversationListResponse>({
    setShowLoading,
    hasNextPage: searchQuery ? searchQueryRes?.hasNextPage : hasNextPage,
    fetchNextPage: searchQuery ? searchQueryRes?.fetchNextPage : fetchNextPage,
    isFetchingNextPage: searchQuery
      ? searchQueryRes?.isFetchingNextPage ?? false
      : isFetchingNextPage,
  });

  const conversations = useMemo(
    () =>
      (searchQuery ? searchQueryRes?.data : data)?.pages.flatMap((page) => page.conversations) ||
      [],
    [data, searchQuery, searchQueryRes?.data],
  );

  const clearSearch = () => {
    setPageNumber(1);
    refreshConversations();
    if (conversationId == 'search') {
      newConversation();
    }
  };

  const toggleNavVisible = () => {
    setNavVisible((prev: boolean) => {
      localStorage.setItem('navVisible', JSON.stringify(!prev));
      return !prev;
    });
    if (newUser) {
      setNewUser(false);
    }
  };

  const itemToggleNav = () => {
    if (isSmallScreen) {
      toggleNavVisible();
    }
  };

  return (
    <>
      <div
        data-testid="nav"
        className={
          'nav active max-w-[500px] flex-shrink-0 overflow-x-hidden bg-surface-primary-alt md:max-w-[400px]'
        }
        style={{
          width: navVisible ? navWidth : '0px',
          visibility: navVisible ? 'visible' : 'hidden',
          transition: 'width 0.2s, visibility 0.2s',
        }}
      >
        <div className="h-full w-[500px] md:w-[400px]">
          <div className="flex h-full min-h-0 flex-col">
            <div
              className={cn(
                'flex h-full min-h-0 flex-col transition-opacity',
                isToggleHovering && !isSmallScreen ? 'opacity-50' : 'opacity-100',
              )}
            >
              <div
                className={cn(
                  'scrollbar-trigger relative h-full w-full flex-1 items-start border-white/20',
                )}
              >
                <nav
                  id="chat-history-nav"
                  aria-label={localize('com_ui_chat_history')}
                  className="flex h-full w-full flex-col px-3 pb-3.5"
                >
                  <div
                    className={cn(
                      '-mr-2 flex-1 flex-col overflow-y-auto pr-2 transition-opacity duration-500',
                      isHovering ? '' : 'scrollbar-transparent',
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={containerRef}
                  >
                    {/* {isSmallScreen == true ? (
                      <div className="pt-3.5">
                        {isSearchEnabled === true && (
                          <SearchBar clearSearch={clearSearch} isSmallScreen={isSmallScreen} />
                        )}
                      </div>
                    ) : (
                      <NewChat
                        toggleNav={itemToggleNav}
                        subHeaders={
                          <>
                            {isSearchEnabled === true && (
                              <SearchBar clearSearch={clearSearch} isSmallScreen={isSmallScreen} />
                            )}
                          </>
                        }
                      />
                    )} */}

                    {isHistory ?
                      <Conversations
                        conversations={conversations}
                        moveToTop={moveToTop}
                        toggleNav={itemToggleNav}
                      /> : <ProjectMenu />
                    }

                    <div className="max-w-sm flex justify-center">
                      <div className="flex w-fit rounded border-2 border-gray-200 bg-gray-100">
                        <button className={`text-white px-4 py-2 rounded flex space-x-6 ${isHistory ? 'bg-black' : ''}`} onClick={() => { setIsHistory(true) }}>
                          <svg className="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                          </svg>
                          History
                        </button>
                        <button className={`text-white px-4 py-2 rounded flex space-x-6 ${!isHistory ? 'bg-black' : ''}`} onClick={() => { setIsHistory(false) }}>
                          <svg className="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z" />
                          </svg>
                          Main
                        </button>
                      </div>
                    </div>

                    {(isFetchingNextPage || showLoading) && (
                      <Spinner className={cn('m-1 mx-auto mb-4 h-4 w-4 text-text-primary')} />
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavToggle
        isHovering={isToggleHovering}
        setIsHovering={setIsToggleHovering}
        onToggle={toggleNavVisible}
        navVisible={navVisible}
        className="fixed left-0 top-1/2 z-40 hidden md:flex"
      />
      <div
        role="button"
        tabIndex={0}
        className={`nav-mask ${navVisible ? 'active' : ''}`}
        onClick={toggleNavVisible}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleNavVisible();
          }
        }}
        aria-label="Toggle navigation"
      />
    </>
  );
};

export default memo(Nav);
