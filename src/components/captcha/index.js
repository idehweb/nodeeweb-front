import React,{ useEffect, useState, useRef } from 'react'
import useCaptcha from 'use-offline-captcha'

const Captcha = ({onActionSubmit,onActionValue}) => {
    const captchaRef = useRef()
    const [value, setValue] = useState()
    const userOpt = {
        type: 'numeric', // "mixed"(default) | "numeric" | "alpha"
        length: 6, // 4 to 8 number. default is 5
        sensitive: false, // Case sensitivity. default is false
        width: 300, // Canvas width. default is 200
        height: 50, // Canvas height. default is 50
        fontColor: '#000',
        background: 'rgba(255, 255, 255, .2)'
    }
    const { gen, validate } = useCaptcha(captchaRef, userOpt)

    useEffect(() => {
      if (gen) gen()
    }, [gen])

    const handleValidate = () => {
        const isValid = validate(value)
        console.log('captchaAction-->',isValid);
    }

    const handleRefresh = () => gen()

    return (
        <>
            <div ref={captchaRef} />
            <input onChange={(e) => {
              setValue(e.target.value);
              onActionSubmit(validate(e.target.value))
              onActionValue(e.target.value)
            }} value={value} />
            {/* <button onClick={handleValidate}>Validate</button> */}
            {/* <button onClick={handleRefresh}>Refresh</button> */}
        </>
  );
}

export default React.memo(Captcha);
