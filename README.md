<h1>Spotify Clone Website</h1>

<h2>App Preview</h2>

https://user-images.githubusercontent.com/56216286/210622822-a5877337-a1e3-468e-acff-c96aebb0bc72.mp4

<h2>Overview</h2>

<p>Welcome to the Spotify Clone App! This app is a clone of the popular music streaming service, Spotify, and has been built using React, Redux, and the Spotify API and SDK.</p>

<h2>Features</h2>

<ul>
  <li>Browse and play songs, albums, and playlists</li>
</ul>

<h2>Getting Started</h2>

<ol>
  <li>
    Sign up for a Spotify developer account and create a new app at the <a href="https://developer.spotify.com/">Spotify Developer Dashboard</a>.
  </li>
  <li>
    Clone this repository and install the dependencies:
    <pre>
git clone https://github.com/your-username/spotify-clone-app.git
cd spotify-clone-app
cd server
npm install
cd client 
npm install
    </pre>
  </li>
  <li>
    Inside the `server` directory, update the following values in the `config.env` file:
    <pre>
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REDIRECT_URL=your-redirect-url
    </pre>
  </li>
  <li>
    Inside the `client` directory, update the following values in the `Statis.tsx` file:
    <pre>
BASE_URL=http://localhost:5000
CLIENT_ID=your-client-id
    </pre>
  </li>
  <li>
    Start the development server:
    <pre>
npm start
    </pre>
  </li>
  <li>
    Start the client server:
    <pre>
npm run dev
    </pre>
  </li>
</ol>

<h2>Built With</h2>

<ul>
  <li>React</li>
  <li>Redux</li>
  <li>Typescript</li>
  <li>Tailwind css</li>
  <li>Spotify API</li>
  <li>Spotify SDK</li>
  <li>NodeJs</li>
</ul>
