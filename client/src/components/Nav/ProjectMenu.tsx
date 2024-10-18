import { useState } from "react";
export default function ProjectMenu() {
    const [isResourceLinkChecked, setIsResourceLinkChecked] = useState(false);
    const [isPromptShowChecked, setIsPromptShowChecked] = useState(false);

    const MenuItem = ({ title, projectList }) => {
        const [showDetails, setShowDetails] = useState(false);

        return (
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 w-[476px] md:w-[376px]">
                <div className="p-4">
                    <div className="flex justify-between">
                        <p className="mb-2 text-slate-800 text-lg font-semibold">{title}</p>
                        <div className="flex space-x-2">
                            <div>
                                <svg className="w-[20px] h-[20px] text-gray-400 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                            </div>
                            <div>
                                <svg className="w-[20px] h-[20px] text-gray-400 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
                                </svg>

                            </div>
                            <div>
                                <svg className="w-[20px] h-[20px] text-gray-400 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                            </div>
                            <div>
                                <svg className="w-[20px] h-[20px] text-gray-400 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                </svg>
                            </div>
                            <div onClick={() => setShowDetails(!showDetails)}>
                                {showDetails ?
                                    <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                    </svg> :
                                    <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                }
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={`flex flex-col justify-center items-center mt-4 transition-all duration-500 ${showDetails ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        {projectList.map((item) => {
                            const [isChecked, setisChecked] = useState(false);
                            return (
                                <div className="flex items-center w-[200px]" onClick={() => { setisChecked(!isChecked) }}>
                                    {isChecked ? (
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex-1">{item}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-[476px] md:w-[376px]">
            {MenuItem({ title: "Google: Summer Party", projectList: ["Call: Jessie Caterer May 25, 2024", "Meeing Ruttie & John"] })}
            {MenuItem({ title: "Google: Summer Party", projectList: ["Call: Jessie Caterer May 25, 2024", "Meeing Ruttie & John"] })}
            {MenuItem({ title: "Google: Summer Party", projectList: ["Call: Jessie Caterer May 25, 2024", "Meeing Ruttie & John"] })}
            {MenuItem({ title: "Google: Summer Party", projectList: ["Call: Jessie Caterer May 25, 2024", "Meeing Ruttie & John"] })}
            <div className="max-w-sm mx-auto">
                <form className="max-w-sm">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recent conversations</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value={-1}>Recent conversations</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </form>
                <div className="flex items-center mt-4 mb-4" onClick={() => { setIsResourceLinkChecked(!isResourceLinkChecked) }}>
                    {isResourceLinkChecked ? (
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                        </svg>
                    )}
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show resouce link</label>
                </div>
                <div className="flex items-center mt-4 mb-4" onClick={() => { setIsPromptShowChecked(!isPromptShowChecked) }}>
                    {isPromptShowChecked ? (
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                        </svg>
                    )}
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show proposed prompt</label>
                </div>
            </div>
        </div>
    )
}