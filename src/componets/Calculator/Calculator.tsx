import React, { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [calc, setCalc] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const opr: string[] = ['/', '*', '+', '-', '.']

  function calculate(expression: string) {
    return new Function('return ' + expression)()
  }

  const updateCalc = (value: string) => {
    if (
      (opr.includes(value) && calc === '') ||
      (opr.includes(value) && opr.includes(calc.slice(-1)))
    ) {
      return
    }
    setCalc(calc + value)

    if (!opr.includes(value)) {
      setResult(calculate(calc + value).toString())
    }
  }

  const createDigits = () => {
    const digits = []
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>,
      )
    }
    return digits
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
          <button>=</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
