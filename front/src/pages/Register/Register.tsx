
import './Register.css'
import { Input } from '@components/Form';

import Heading from '@components/common/Heading/Heading';
import useRegister from '@hooks/useRegister';
import { Col, Row, Form, Button, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';





const Register = () => {

  const { register, handleSubmit, submitForm, formErrors,
    emailOnBlurHandler, emailAvailabilityStatus,
    loading, error, accessToken,

  } = useRegister();


console.log(accessToken);


  if (accessToken) {
    return <Navigate to="/" />
  }


  return (
    <>
      <Heading title='User Registraion' />
      <Row>
        <Col md={{ span: 6, offset: 3 }} >
          <Form onSubmit={handleSubmit(submitForm)}>

            <Input
              label='First Name'
              name='firstName'
              register={register}
              error={formErrors.firstName?.message}
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message}
            />

            <Input

              label="Email Address"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}

              error={formErrors.email?.message ?
                formErrors.email?.message : emailAvailabilityStatus === 'notAvailable' ? "Error From the server" : ''

              }

              formText={
                emailAvailabilityStatus === 'checking' ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }

              success={
                emailAvailabilityStatus === 'available' ? "this email is available for use." : ''
              }


              disabled={emailAvailabilityStatus === 'checking' ? true : false}

            />








            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={formErrors.password?.message}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={formErrors.confirmPassword?.message}
            />




            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              // eslint-disable-next-line no-constant-binary-expression
              disabled={emailAvailabilityStatus === "checking" ? true : false || loading === "pending"}
            >
              {loading === 'pending' ? (
                <>
                  <Spinner animation='border' size='sm' ></Spinner> Loading ....
                </>
              ) : (

                "Submit"

              )
              }
            </Button>
            {error && (

              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )
            }
          </Form>

        </Col>
      </Row>
    </>



  )
}

export default Register