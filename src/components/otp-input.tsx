import {
   ElementRef,
   InputHTMLAttributes,
   KeyboardEvent,
   MutableRefObject,
   useRef,
   useState,
} from 'react'

export default function OtpInput({
   length = 4,
   onSubmit,
   RenderInput,
}: {
   length?: number
   onSubmit?: (otp: string) => void
   RenderInput?: (
      props: InputHTMLAttributes<HTMLInputElement> & {
         inputRef: MutableRefObject<ElementRef<'input'>> | ((node: HTMLInputElement) => void)
      }
   ) => JSX.Element
}) {
   const [otpValues, setOtpValues] = useState<string[]>(() => new Array(length).fill(''))
   const inputRefs = useRef<Array<ElementRef<'input'>>>([])
   const handleChange = (val: string, idx: number) => {
      if (isNaN(+val)) return

      otpValues[idx] = val.substring(val.length - 1)
      setOtpValues([...otpValues])

      // move to next field if current field  is filled
      if (val && idx < length - 1 && inputRefs.current[idx + 1]) {
         inputRefs.current[idx + 1].focus()
      }

      if (otpValues.join("").length >= length) {
         onSubmit?.(otpValues.join(''))
      }
   }

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
      // should pass below conditions
      // key == backspace
      // input is empty
      // input is not first input
      // if previous input is available
      if (e.key == 'Backspace' && !otpValues[idx] && idx > 0 && inputRefs.current[idx - 1]) {
         inputRefs.current[idx - 1].focus()
         handleClick(idx - 1)
      }
   }

   const handleClick = (idx: number) => {
      inputRefs.current[idx].setSelectionRange(0, 1)
   }

   return (
      <div className='otp-input flex gap-2'>
         {otpValues.map((val, idx) => {
            if (RenderInput) {
               return (
                  <RenderInput
                     key={idx}
                     autoFocus={idx == 0}
                     inputRef={(node) => {
                        inputRefs.current[idx] = node!
                     }}
                     value={val}
                     onChange={(e) => handleChange(e.target.value, idx)}
                     onKeyDown={(e) => handleKeyDown(e, idx)}
                     onClick={() => handleClick(idx)}
                  />
               )
            }
            return (
               <input
                  key={idx}
                  autoFocus={idx == 0}
                  ref={(node) => {
                     inputRefs.current[idx] = node!
                  }}
                  value={val}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onClick={() => handleClick(idx)}
                  className='border border-black rounded-md w-10 h-10 text-center'
               />
            )
         })}
      </div>
   )
}
