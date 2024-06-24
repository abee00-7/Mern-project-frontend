import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel,Card,Col,Row, Button } from 'react-bootstrap';
import { FaUserGraduate, FaLaptop, FaUniversity, FaStar } from 'react-icons/fa';
import './LandingPage.css';
import logo from '../assets/clogo.png'
import img1 from'../assets/T1.jpg'
import img2 from'../assets/T2.jpg'
import img3 from'../assets/T4.jpg'
import profimg from '../assets/prof.png'
import image from'../assets/bg.jpg'
function LandingPage() {
  ;
  return (
    <div className="landing-page bg-dark">
      <Navbar bg="light" variant="light" expand="lg" >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo} // Replace with the path to your logo image
              width="50"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/colleges">Colleges</Nav.Link>
              <Nav.Link as={Link} to="/About">About</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={img1} alt="First slide" />
           
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={img2} alt="Second slide" />
           
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 h-50" src={img3} alt="Third slide" />
           
          </Carousel.Item>
        </Carousel>
      </Container>
      {/* Features Section */}
      <section className="features py-5 ">
        <Container>
          <h2 className="text-center mb-4 text-warning">Our Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
             
                  <Card.Title>Personalized Counseling</Card.Title>
                  <Card.Text>Get personalized career counseling from experts based on your interests and skills.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
               
                  <Card.Title>Extensive College Database</Card.Title>
                  <Card.Text>Access detailed information on a wide range of colleges and their courses.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
               
                  <Card.Title>Aptitude Tests</Card.Title>
                  <Card.Text>Take aptitude tests to understand your strengths and find the best career paths.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Reviews Section */}
        {/* Reviews Section */}
        <section className="reviews py-5 bg-dark">
        <Container>
          <h2 className="text-center mb-4 text-warning">User Reviews</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img width={'60px'} height={'60px'} src={profimg} alt="Profile" className="rounded-circle mr-3" />
                    <div>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                      </div>
                      <small className="text-muted">- Kiran</small>
                    </div>
                  </div>
                  <Card.Text>
                    "The career counseling platform helped me choose the right college and course. Highly recommended!"
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img width={'60px'} height={'60px'}  src={profimg} alt="Profile" className="rounded-circle mr-3" />
                    <div>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                      </div>
                      <small className="text-muted">- Abhinav</small>
                    </div>
                  </div>
                  <Card.Text>
                    "Excellent counseling services. The aptitude tests were really helpful in understanding my strengths."
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body >
                  <div className="d-flex align-items-center mb-3">
                    <img width={'60px'} height={'60px'}  src={profimg} alt="Profile" className="rounded-circle mr-3" />
                    <div>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                      </div>
                      <small className="text-muted">- Karthik</small>
                    </div>
                  </div>
                  <Card.Text>
                    "A great resource for students looking for guidance on their career paths."
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="services py-5 text-light">
  <Container>
    <h2 className="text-center mb-4 text-warning">Our Services</h2>
    <Row >
      <Col md={4} className="mb-4">
        <div className="text-center ">
          <FaUserGraduate className="mb-3" size={40} />
          <h4>Career Counseling</h4>
          <p className='text-light'>Personalized career guidance based on interests and skills.</p>
        </div>
      </Col>
      <Col md={4} className="mb-4">
        <div className="text-center">
          <FaLaptop className="mb-3" size={40} />
          <h4>Aptitude Tests</h4>
          <p className='text-light'>Assess strengths and weaknesses with our aptitude tests.</p>
        </div>
      </Col>
      <Col md={4} className="mb-4">
        <div className="text-center">
          <FaUniversity className="mb-3" size={40} />
          <h4>College Search</h4>
          <p className='text-light'>Explore a wide database of colleges and courses.</p>
        </div>
      </Col>
    </Row>
  </Container>
</section>
<section className="call-to-action py-5">
        <Container>
          <Row>
            <Col md={8} className="text-center mx-auto">
              <h2>Ready to find your dream career?</h2>
              <p>Sign up now and start exploring our wide range of career counseling services!</p>
             <Link as={Link} to="/signup"><button className='btn btn-success'>GET STARTED</button></Link>
            </Col>
          </Row>
        </Container>
      </section>


      <footer className=" text-dark text-center py-3 mt-5">
        <Container>
        
          <div style={{height:'300px'}} className='container mt-5 w-100'>
      <div className="d-flex justify-content-between ">
        <div style={{width:'400px'}} className="intro">
          <h5><i class="fa-brands fa-studiovinari"></i> Career Theory</h5>
          <p>Our mission is to provide students with the resources and guidance they need to make informed decisions about their education  career paths.</p> 
          <p>We connect students with colleges and provide tools to assess their skills and match them with appropriate institutions </p>
         
        </div>
        <div className="links d-flex flex-column">
        <h5>Links</h5>
        <Link className='text-dark' to={'/college'} style={{textDecoration:'none',color:'white'}}>Colleges </Link>
        <Link className='text-dark' to={'/About'} style={{textDecoration:'none',color:'white'}}>About </Link>
        <Link className='text-dark' to={'/login'} style={{textDecoration:'none',color:'white'}}>Login </Link>
        </div>
        <div className="guides d-flex flex-column">
          <h5>Guides</h5>
          <a className='text-dark' href="https://react.dev/" style={{textDecoration:'none',color:'white'}} target='_blank'>React</a>
          <a className='text-dark' href="https://react-bootstrap.github.io/" style={{textDecoration:'none',color:'white'}} target='_blank'>React Bootstrap</a>
          <a className='text-dark' href="https://reactrouter.com/en/main" style={{textDecoration:'none',color:'white'}} target='_blank'>React Router</a>
        </div>
        <div className="contact d-flex flex-column">
          <h5> Contact Us </h5>
          <div className="d-flex">
            <input  placeholder='Enter your email here' type="text" className="form-control" />
            <button className='btn btn-info ms-2'><i className="fa-solid fa-arrow-right "></i></button>
          </div>
          <div className="icons d-flex justify-content-between mt-3">
            <a  className='text-dark' href="" style={{textDecoration:'none',color:'white'}} target='_blank'> <i className="fa-brands fa-twitter"></i> </a>
            <a className='text-dark' href="" style={{textDecoration:'none',color:'white'}} target='_blank'> <i className="fa-brands fa-instagram"></i> </a>
            <a className='text-dark' href="" style={{textDecoration:'none',color:'white'}} target='_blank'> <i className="fa-brands fa-facebook"></i> </a>
            <a className='text-dark' href="" style={{textDecoration:'none',color:'white'}} target='_blank'> <i className="fa-brands fa-linkedin"></i> </a>
            <a className='text-dark' href="" style={{textDecoration:'none',color:'white'}} target='_blank'> <i className="fa-brands fa-github"></i> </a>
            <a className='text-dark' href="" style={{textDecoration:'none',color:'white'}} target='_blank'> <i className="fa-solid fa-phone"></i> </a>
          </div>
        </div>
      </div>
      <p>&copy; 2024 Career Theory</p>
    </div>

        </Container>
      </footer>
    </div>
    
  );
}

export default LandingPage;
