const App = () => {
  
    //State stuff 
    const [inputText,setInputText] = useState("");
    const [todos,setTodos]= useState([]);
    const [status, setStatus]= useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);
      
    //Run once when the app start
       useEffect(() => {
           getLocalTodos();  
       }, []);

    //UseEffect
      useEffect(()=>{
       filterHandler();
       saveLocalTodos();
    },[todos, status]);
    //Functions 
    const filterHandler = ()=>{
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true ));
                break;
            case 'uncompleted':
                    setFilteredTodos(todos.filter(todo => todo.completed === false ));
                    break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };
    // Save to Local
    const saveLocalTodos = ()=>{
            localStorage.setItem('todos', JSON.stringify(todos));
    };
    const getLocalTodos = ()=>{
        if (localStorage.getItem('todos') === null ) {
            localStorage.setItem('todos', JSON.stringify([]));
        }else{
          let todoLocal = JSON.parse(localStorage.getItem('todos'));
        //    console.log(todoLocal);
        setTodos(todoLocal);
        }
    } 
    return (
        <div className='App'>
        <header><h1>What's the Plan For Today?</h1></header>
            <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus}  />
            <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
        </div>
    )
}