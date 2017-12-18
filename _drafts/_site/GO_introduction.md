

# GO!

Why GO?

It builds a single binary when you package.

Good at parallel programming.

[There is a great tutorial](https://tour.golang.org/welcome/1).


Go doesnt use objects, it uses structures.  You still have functions.  

Everything is public to the structure.  Anything defined in package main is public to package main.  But if you define your function with an upper case it will be globally exported.  So capitals are exported.


x, y, int 

func Add(x, y int)int{
	
}


func split (sum int) (x, y int){
	
}

x, y int there is 
first int says x and y are ints
second int says that it returns an int.



```
var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)
```