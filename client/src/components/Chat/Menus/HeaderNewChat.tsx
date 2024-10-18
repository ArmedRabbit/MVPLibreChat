import { NewChatIcon } from '~/components/svg';
import { useChatContext } from '~/Providers';
import { useMediaQuery, useLocalize } from '~/hooks';

export default function HeaderNewChat() {
  const { newConversation } = useChatContext();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const localize = useLocalize();
  if (isSmallScreen) {
    return null;
  }
  return (
    <button
      data-testid="wide-header-new-chat-button"
      aria-label={localize("com_ui_new_chat")}
      className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full"
      onClick={() => newConversation()}
    >
      <svg className="w-6 h-6 text-gray-400 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
      </svg>
      <h2 className="flex-1 w-max inline">New Convo</h2>
    </button>
  );
}
