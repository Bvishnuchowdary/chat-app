import MessageInput from "./MessageInput";
import Messages from "./Messages";
import {TiMessages} from 'react-icons/ti'
const MessageContainer = () => {

    const nochatselected = true
	return (
		<div className='md:min-w-[450px] flex flex-col w-5/6'>
			{
                nochatselected ? (<NoChatSelected/>):
                (
                <>
				{/* Header */}
				<div className='px-4 py-2 mb-2 '>
					<span className='label-text'>To:</span> <span className='font-bold text-gray-900'>John doe</span>
				</div>

				<Messages />
				<MessageInput />
			    </>
                )
            }
		</div>
	);
};

const NoChatSelected = () => {
	
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='flex flex-col items-center gap-2 px-4 font-semibold text-center text-gray-900 sm:text-lg md:text-xl'>
				<p>Welcome 👋  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl text-center md:text-6xl' />
			</div>
		</div>
	);
};

export default MessageContainer;