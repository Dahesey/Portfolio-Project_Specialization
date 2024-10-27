const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');
const { frontdeskRegister, frontdeskLogIn, getFrontDeskDetail} = require('../controllers/frontdesk-controller.js');

const { financeRegister, financeLogIn, getFinanceDetail} = require('../controllers/finance-controller.js');

const { memberRegister, getAllMembers,  getMemberDetail } = require('../controllers/member-controller.js');

const { eventCreate, getAllEvents, getLatestEventID } = require('../controllers/event-controller.js');

const { childRegister, getChildDetail, getAllChildren } = require('../controllers/child-controller.js');



// Admins
router.post('/AdminReg', adminRegister);
router.post('/Adminlogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)
// router.put("/Admin/:id", updateAdmin)


//FrontDesk
router.post('/FrontdeskReg', frontdeskRegister);
router.post('/Frontdesklogin', frontdeskLogIn);
router.get("/FrontDesk/:id", getFrontDeskDetail)


//Finance
router.post('/FinanceReg', financeRegister);
router.post('/Financelogin', financeLogIn);
router.get("/Finance/:id", getFinanceDetail)



//Member
router.post('/MemberReg', memberRegister);
router.get("/Member/:id", getMemberDetail);
router.get('/members', getAllMembers)


//Member
router.post('/childrenReg', childRegister);
router.get("/children/:id", getChildDetail);
router.get('/children', getAllChildren)





//Event
// router.post('/AdminEventReg', eventRegister);
router.post('/Admin/EventCreate', eventCreate);
router.get('/latestEventID', getLatestEventID);  
router.get('/events', getAllEvents);  

// router.get("/Event/:id", getEventDetail)










module.exports = router;