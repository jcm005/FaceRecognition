import './App.css';
import Navigation from './componenets/navigation/Navigation';
import Logo from './componenets/logo/Logo';
import Rank from './componenets/rank/rank'
import ImageLink from './componenets/imageLink/imageLink';
import SignIn from './componenets/signin/signin'
import Particles from 'react-particles-js';
import Register from './componenets/signin/register'

import { Component } from 'react';
import FaceReco from './componenets/face';
import Clarifai from 'clarifai';


const app = new Clarifai.App({ apiKey: '8574ae4ec5094e459de26dbf89fe7742' });

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      bound: {},
      route: 'signin',
      isSignedIn: false,
    }
  }



  calculateFaceLocation = (data) => {

    const faces = (data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {

      leftcol: faces.left_col * width,
      topRow: faces.top_row * height,
      rightcol: width - (faces.right_col * width),
      bottomrow: height - (faces.bottom_row * height),

    }



  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ bound: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    var proccessed = [];
    this.setState({ imageUrl: this.state.input })

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response)
        );
      }

      )
      .catch((err => {
        console.log(err);
      }))

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })

    }
    this.setState({ route: route });

  }

  render() {

    const { isSignedIn, imageUrl, route, bound } = this.state;

    return (
      <div className="App" >

        <Particles className='particles'
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn} />

        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank />
            <ImageLink
              onInputChange={this.onInputChange}
              onSubmit={this.onButtonSubmit} />
            <FaceReco imageUrl={this.state.imageUrl} bound={bound} />
          </div>

          : (
            route === 'signin'
              ?
              <SignIn onRouteChange={this.onRouteChange} />
              :
              <Register onRouteChange={this.onRouteChange} />
          )



        }
      </div>
    );
  }
}

export default App;

