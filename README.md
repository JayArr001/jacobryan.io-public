# jacobryan.io-public
### Hello world! This is my public repository for https://jacobryan.io/ ###

Here you can look at my code and how I architected the frontend and backend.

The tech stack is as listed:  
Frontend: ReactJS, TailwindCSS, OAuth2.0, JavaScript, HTML, CSS  
Backend: Java Spring Boot  
Database: PostgreSQL  

The webapp is a bundled React + Spring Boot solution. In other words, Spring Boot is serving React.  
  
Inside the frontend, I made reusable components where it made sense to help manage scale and minimize re-writing the same code, along with making the hierarchy easier to interface with. Users can login with their Google accounts to write guestbook posts. This way I don't have to store/secure/hash any sensitive user credentials or have another sub-system for signing up/account deletion. Users can still be request their information to be deleted; since this action is extremely rare, is easier to just manually operate.  
  
In the backend, Java Spring Boot is the industry-standard for enterprise solutions and so it is more than a sufficient solution for https://jacobryan.io/.  
  
The Spring Boot framework uses the IoC principle (Inversion of Control). This means design objectives (from a programming perspective) shifted from explicitly managing objects (eg Foo foo = new Foo) to marking "beans" and telling the framework "please make a new bean" (@Bean Foo foo) and providing interfaces/functions for how I want those beans to behave. Spring Boot also obviously performs all validation of frontend requests and it should go without saying that its security is top of the line.  

Lastly, User data, Blog posts and Guestbook information is stored in a PostgreSQL database.  
  
When you're finished here, please check out https://jacobryan.io/ to see the finished product!
