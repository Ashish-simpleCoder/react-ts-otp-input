import OtpInput from './components/otp-input'

export default function App() {
   return (
      <div>
         <h1 className='text-center text-2xl py-4'>Otp Input</h1>
         <div className='grid place-content-center'>
            <OtpInput
               RenderInput={({ inputRef, ...props }) => {
                  return (
                     <input
                        {...props}
                        ref={inputRef}
                        className='border border-purple-600 bg-purple-100 rounded-md w-10 h-10 text-center'
                     />
                  )
               }}
               onSubmit={(otp) =>console.log({otp})}
            />
         </div>
      </div>
   )
}
