import { useState } from 'react';

/*
 * if we have no bias toward c, f
 * we should create
 *
 * temperature: {
 *    c: value,
 *    f: value,
 * }
 */

/*
 * in tutorial they store the most recently changed input
 * {
 *   temperature: '212',
 *   scale: 'f'
 * }
 */

const toCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  return convert(input);
};

const BoilingVerdict = (props) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
};

const TemperatureInput = (props) => {
  let temperature;
  const setTemperature = props.setTemperature;
  let handleChange;
  if (props.scale === 'Celsius') {
    temperature = props.temperature;

    handleChange = (event) => {
      setTemperature(event.target.value);
    };
  } else {
    temperature = tryConvert(props.temperature, toFahrenheit);
    handleChange = (event) => {
      setTemperature(tryConvert(event.target.value, toCelsius));
    };
  }

  return (
    <fieldset>
      <legend>Enter temperature in {props.scale}</legend>
      <input value={temperature} onChange={handleChange} />
      <BoilingVerdict celsius={parseFloat(temperature)} />
    </fieldset>
  );
};

const Calculator = () => {
  const [temperature, setTemperature] = useState('');
  return (
    <>
      <TemperatureInput
        temperature={temperature}
        setTemperature={setTemperature}
        scale="Celsius"
      />
      <TemperatureInput
        temperature={temperature}
        setTemperature={setTemperature}
        scale="Fahrenheit"
      />
    </>
  );
};

const LiftingStateUp = () => {
  return (
    <>
      <Calculator />
    </>
  );
};

export default LiftingStateUp;
