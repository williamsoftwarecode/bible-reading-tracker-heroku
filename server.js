import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

//Install express server
const path = require('path');

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

router.route('/date/add').post((req, res) => {

    var date = req.body.date;
    let docRef = db.collection('date').doc(date);

    db.collection('date').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
        });
    })

    // If date doc does not exist, create new date doc
    // If date doc exists, update date doc
    docRef.update({
        date: date,
        read: admin.firestore.FieldValue.arrayUnion(req.body.bookSelected+' '+req.body.chapterSelected),
        bookSelected: req.body.bookSelected,
        chapterSelected: req.body.chapterSelected
    })
    .then(usersRef => {
        res.status(200).json({'date': 'Updated successfully'}); 
    })
    .catch(err => {
        // Create new doc
        docRef.set({
            date: date,
            read: admin.firestore.FieldValue.arrayUnion(req.body.bookSelected+' '+req.body.chapterSelected),
            bookSelected: req.body.bookSelected,
            chapterSelected: req.body.chapterSelected
        })
        .then(usersRef => {
            res.status(200).json({'date': 'Added successfully'}); 
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
    });
});
router.route('/issues').get((req, res) => {

    // Returns all dates
    db.collection('date').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
            //   console.log(doc.id, '=>', doc.data());
            });
            var docs = snapshot.docs.map(doc => doc.data());
            res.end(JSON.stringify(docs));
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
});
// router.route('/issues/:id').get((req, res) => {
    // Issue.findById(req.params.id, (err, issue) => {
    //     if (err)
    //         console.log(err);
    //     else
    //         res.json(issue);
    // })
// });
router.route('/issues/update/:title').post((req, res) => {
    // Issue.findById(req.params.id, (err, issue) => {
    //     if (!issue)
    //         return next(new Error('Could not load Document'));
    //     else {
    //         issue.title = req.body.title;
    //         issue.responsible = req.body.responsible;
    //         issue.description = req.body.description;
    //         issue.severity = req.body.severity;
    //         issue.status = req.body.status;
    //         issue.save().then(issue => {
    //             res.json('Update done');
    //         }).catch(err => {
    //             res.status(400).send('Update failed');
    //         });
    //     }
    // });
});
router.route('/issues/delete/:date').get((req, res) => {
    // console.log(decodeURIComponent(req.params.date));
    db.collection('date').doc(decodeURIComponent(req.params.date))
    .delete()
    .then(usersRef => {
        res.status(200).json({'date': 'Deleted successfully'}); 
    })
    .catch(err => {
        res.status(400).send('Failed to delete');
    });;
    // Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    //     if (err)
    //         res.json(err);
    //     else
    //         res.json('Removed successfully');
    // });
});

app.use('/', router);
// app.listen(4000, () => console.log(`Express server running on port 4000`));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/bible-reading-tracker-heroku'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/bible-reading-tracker-heroku/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
