import React, { useCallback, useMemo, useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [calc, setCalc] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const opr: string[] = useMemo(() => ['/', '*', '+', '-', '.'], [])

  const calculate = useCallback((expression: string) => {
    try {
      return new Function('return ' + expression)()
    } catch (error) {
      return ''
    }
  }, [])

  const updateCalc = useCallback(
    (value: string) => {
      if (
        (opr.includes(value) && calc === '') ||
        (opr.includes(value) && opr.includes(calc.slice(-1)))
      ) {
        return
      }

      const newCalc = calc + value
      setCalc(newCalc)

      if (!opr.includes(value)) {
        setResult(calculate(newCalc).toString())
      }
    },
    [calc, calculate, opr],
  )

  const createDigits = () => {
    return Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
      <button onClick={() => updateCalc(i.toString())} key={i}>
        {i}
      </button>
    ))
  }
  return (
    <div className={'calculator'}>
      <div className="calculator-container">
        <div className="calculator-screen">
          {result ? <span>{`(${result})`}</span> : ''} {calc || '0'}
        </div>
        <div className="calculator-symbol">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button
            onClick={() => {
              setCalc('')
              setResult('')
            }}
          >
            Del
          </button>
        </div>
        <div className="calculator-numbers">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button
            onClick={() => {
              setCalc(result)
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
