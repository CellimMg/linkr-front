import { Link } from "react-router-dom";

export default function Hashtag({ name }) {
  console.log(name);

    return (
      <Link style={{textDecoration: 'none'}} to={`/timeline/${name}`}>
      <p># {name}</p>
      </Link>
    );
}