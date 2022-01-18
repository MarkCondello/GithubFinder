import SpinnerImg from './assets/spinner.gif'

function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img src={SpinnerImg} alt="Loading ..." width='180' className="text-center mrg-auto"/>
    </div>
  )
}

export default Spinner