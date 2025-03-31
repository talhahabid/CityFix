import { useSignOut } from "../hooks/useSignOut";
import { useAuthContext } from "../hooks/useAuthContext";

function CitizenHome() {
    
    const { user } = useAuthContext();
    const { signOut } = useSignOut();
  return (
    <div>
        <button className="bg-red-400 pd-10 " onClick={signOut}>Logout</button>
        <form action="">
            <input type="text" placeholder="location" />
            <input type="text" placeholder="problem type"/>
            <input type="file" name="Image"/>
            <input type="radio" placeholder="recive notifications"/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default CitizenHome
