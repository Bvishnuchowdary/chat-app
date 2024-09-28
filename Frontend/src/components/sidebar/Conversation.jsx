const Conversation = ({avatar , name}) => {
	return (
		<>
			<div className='flex items-center gap-2 p-2 py-1 rounded cursor-pointer hover:bg-sky-500'>
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img
							src={avatar}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex justify-between gap-3'>
						<p className='font-bold text-gray-900'>{name}</p>
						<span className='text-xl'>🎃</span>
					</div>
				</div>
			</div>

			<div className='h-1 py-0 my-0 divider' />
		</>
	);
};
export default Conversation;