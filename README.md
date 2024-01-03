![](src/logo_app.png)

The application is inspired by Facebook, but places a stronger emphasis on groups. Users can join these groups and add posts.

Currently the application is still in progress, some features are still not present. Also the application requires extraction of styled components to external files.

#### Design
Application was firstly designed using Figma, here is the link: ```https://www.figma.com/file/4O92T2JeSafWVgg8YOYtLw/SayHi?type=design&node-id=0%3A1&mode=design&t=jOftsMIuhPU9H52a-1```
#### Technology used
Application was written in react, alongside with mui library.
For state management between components I decided to implement something Redux-like with usage of ```useReducer``` and ```useContext``` hooks.

#### How application works
To use the application first you would need to register yourself. Nextly, once you successfully register and login
you are redirected to main component which is Home. Home is split into three sections:

##### Left bar
In this bar on the very top there is a button that is responsible for a group creation. Upon clicking user is presented a modal with a form which allows him to create a new group.
Underneath, there is a list of user groups. Upon clicking the group (button), group specific data and posts are presented in other bars.
##### Middle bar
Middle bar is responsible for creating and browsing groups posts.
##### Right bar
In the right bar user can see the details of currently active group, additional group management options and user profile.

#### How to launch
To launch an application you would need to execute ```npm install``` and then ```npm start```.

For an application to fully work one also needs a backend which is available at: ```https://github.com/Marduuk/teachbook```

