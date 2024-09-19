
import Heading from "@components/common/Heading/Heading"
import { Input } from "@components/Form"
import useLogin from "@hooks/useLogin"

import { Col, Form, Row ,Button,Spinner, Alert} from "react-bootstrap"
import { Navigate } from "react-router-dom"


const Login = () => {

  const { handleSubmit, submitForm, register,
    formErros,
    SearchParams, error, accessToken, loading
    
  } = useLogin();
 
  

  if (accessToken) {
    return <Navigate to="/"/>
  }

  return (
    
    <>
      <Heading title="User Login"/>
      <Row>
        <Col md={{ span: 6, offset: 3 }} >
          {
            SearchParams.get('message') === "login_required" && <Alert variant="success" >

              you neeed to login to view this content

            </Alert>
          
          
          }
          {
            SearchParams.get('message') === "account_created" &&
            <Alert variant="success" >

              your account successfully created ,please Login
            </Alert>
          
          
          }







          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              type="email"
              label="Email  Address"
              name="email"
              register={register}
              error={formErros.email?.message}
            />
            <Input
              type="password"
              label="password"
              name="password"
              register={register}
              error={formErros.password?.message}
            />
     

            

     <Button variant="info" type="submit" style={{ color: "white" }}>
     {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>


   {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}


          </Form>
        </Col> 

 </Row>
    </>
    
  )
}

export default Login