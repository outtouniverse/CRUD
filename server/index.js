const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const UserModel=require('./models/Users')
const app=express()

app.use(cors(
    {
        origin:["https://artrestoration-qgs231a69-outtouniverses-projects.vercel.app/"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }
));
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb+srv://aakub1096:KlwWqgPMlnEf3K2u@cluster0.ixkgp7g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


app.get('/disp',(req,res)=>{
    UserModel.find({}).then(users=>res.json(users)).catch(err=>res.json(err))
})
app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id}).then(users=>res.json(users)).catch(err=>res.json(err))
})
app.put('/updateUser/:id', upload.single('art'), (req, res) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        desp: req.body.desp,
        aname: req.body.aname,
    };
    if (req.file) {
        updateData.image = '/public/images/' + req.file.filename;
    }

    UserModel.findByIdAndUpdate(id, updateData, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});
app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id}).then(users=>res.json(users)).catch(err=>res.json(err))
})

app.post('/createUser', upload.single('art'), (req, res) => {
    const { name, desp, aname } = req.body;
    const imagePath = req.file ? '/public/images/' + req.file.filename : '';

    const newUser = new UserModel({
        name,
        desp,
        image: imagePath,
        aname
    });

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});


app.listen(5000,()=>{
    console.log("server running");
})