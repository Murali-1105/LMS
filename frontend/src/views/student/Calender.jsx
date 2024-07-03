import React from 'react' 

const Dev = () => {
  return (
    <> 
<div className="container p-5 h-100 d-flex justify-content-center align-items-center">
    <div className="row">
      <div className="col-12 col-sm-6">
        <img id="background-img" src="/development-dark-simple.svg" alt="Under Devlopment Image"className="img-fluid" style={{width:'600px'}}/>
      </div>
      <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-start align-items-center "> 
        <div className='text-left'>
          <div className="text-uppercase pb-3">
            <h1 className="fs-3">Coming</h1>
            <h1 className="fs-3">Soon...</h1>
          </div>
            <p className='fs-6'>This Page is Under Development</p>
          <div> 
          </div> 
        </div>
      </div>
    </div> 
</div>
    </>
  )
}

export default Dev