export const InputWithLabel = ({ label, type, value, setValue }) => <div><label>
  {`${label}: `}
  <input type={type} value={value} onChange={(event) => setValue(event.target.value)} />
</label></div>


const Form = ({ title, submit: { submitName, submitFormHandler }, inputs }) => <>
  <h2>{title}</h2>
  <form onSubmit={submitFormHandler}>
    {inputs.map(input => <InputWithLabel key={input.label} {...input} />)}
    <div><button type="submit">{submitName}</button></div>
  </form>
</>

export default Form
