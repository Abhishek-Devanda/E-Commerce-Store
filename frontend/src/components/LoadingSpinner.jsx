import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-emr'>
			<div className='relative'>
				{/* <div className='w-20 h-20 border-emerald-200 border-2 rounded-full' /> */}
				<Loader2 className='w-20 h-20 text-emerald-500 animate-spin absolute left-0 top-0'/>
				<div  />
			</div>
		</div>
	);
};

export default LoadingSpinner;