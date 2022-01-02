declare namespace solveTypes {
    interface message{
        user: string;
        message: string;
    }
    interface context{
        user: string;
        setUser : React.Dispatch<React.SetStateAction<string>>
        setLogged : React.Dispatch<React.SetStateAction<boolean>>
    }

}