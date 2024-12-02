# DevTinderAPIs 

## /authRouter
POST / signup
POST / login
POST / logout

### /ProfileRouter
GET / profile/view
PATCH / profile/edit
patch / Profile/password

### /ConnectionRequestRouter
POST / request/send/intereted/:userId
POST / request/send/ignored/:userId
POST / request / review /accepted/:requestId
POST / request / review /rejected/:requestId

#### /userRouter
GET /user /Connections
GET /requests/recived
GET / fee - Gets you the profiles of other users on platform

Status: ignored, interested, accepeted, rejected

