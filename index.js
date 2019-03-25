const express = require('express');
const app = express();
let bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();
const uuid = require('uuid')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



let posts = [{
	id: uuid.v4(),
	title: 'The Beatles',
	content: 'The Beatles fue una banda de rock inglesa activa...',
	author: 'Clemente',
	publishDate: '24-Mar-2019'
  },{
	id: uuid.v4(),
	title: `The Who`,
	content: 'The Who es una banda británica de rock considerada un icono de la música del siglo XX...',
	author: 'Clemente',
	publishDate: '24-Mar-2019'
  },{
	id: uuid.v4(),
	title: `Tool`,
	content: 'Tool es una banda estadounidense de metal progresivo surgida en 1990 en Los Ángeles, California...',
	author: 'Clemente',
	publishDate: '24-Mar-2019'
  },{
	id: uuid.v4(),
	title: 'alt-j',
	content: 'Alt J es una banda inglesa de indie rock, formada en el año 2007. Su álbum debut An Awesome Wave, lanzado en mayo de 2012...',
	author: 'Carlos',
	publishDate: '24-Mar-2019'
  }]







//syntax possible because of express()
app.get('/blog-posts', (req, res) => {
	//200 is for success
	res.status(200).json({
		message : "Succesfully sent json message",
		status : 200,
		posts
	});
});

app.get('/blog-posts/:author', (req, res) =>{
	let blogAuthor = req.params.author;
	let  AthorPosts = [];

	if(!blogAuthor){
		res.status(406).json({
		  message: 'No author in parameters',
		  status: 406
		});
	}
	

	posts.forEach(item => {

		if(item.author == blogAuthor){
			AthorPosts.push(item);
		}
		
	});

	if( AthorPosts.length != 0){
		res.status(200).json({
			message : "Succesfully sent the post of determined author",
			status : 200,
			post : AthorPosts
		});
	}
	
	//error status
	res.status(406).json({
		message: "Author Not found in the list",
		status : 406
	});
});


app.post('/blog-posts', (req,res) => {
	let requiredFields = ['title', 'content','author','publishDate'];
	
	let post = req.body;




	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			}).send("Finish");
		}
	}

  post['id'] = uuid.v4()
  posts.push(post)


	res.status(201).json({
		message : "Successfully added new post",
		status : 201,
		post
	})




}); 


app.delete('/blog-posts/:id', (req,res) => {

	let bodyId = req.body.id
  let paramsId = req.params.id;

  if( !paramsId  ||  !bodyId  ){
    res.status(406).json({
      message : "Missing field Id",
      status : 406
    });

  }

  for(let i=0; i<posts.length; i++) {
    if (posts[i].id === bodyId){
	posts.splice(i, 1);
	res.status(204).json({
		});
    }
  }

    res.status(404).json({
      message : "Id not found.",
      status : 404
    });
    


}); 


app.put('/blog-posts/:id', (req,res) => {
	let requiredFields = ['title', 'content',"author",'publishDate'];
	let body = req.body
	let paramsId = req.params.id;

	if ( !body.author && !body.title && !body.content && !body.publishDate ){
		res.status(406).json({
			message : "Missing Body",
			status : 404
		  });
	}

  if( !paramsId ){
    res.status(406).json({
      message : "Missing field Id",
      status : 406
    });
  }

  let post = null;
  for(let i=0; i<posts.length; i++) {
    if (posts[i].id === paramsId){
		

		if ("title" in req.body ){
			posts[i].title =  req.body.title;
		}
		if ("content" in req.body ){
			posts[i].content =  req.body.content;
		}
		if ("author" in req.body ){
			posts[i].author =  req.body.author;
		}
		if ("publishDate" in req.body ){
			posts[i].publishDate =  req.body.publishDate;
		}
		post = posts[i]


	res.status(200).json({
		message : "Succesfully Updated",
		status : 200,
		post : post
	});
	}
  }







}); 







//port 8080 pero se puede poner cualquiera
app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});

//para postman en cargarlo se queda con la version previa cargada por eso sigue jalando aunque haya un error

//if ( !body.author && !body.title && !body.content && !body.publishDate ){