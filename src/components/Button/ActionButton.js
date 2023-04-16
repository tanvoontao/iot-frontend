import Link from "next/link"

const ActionButton = (props) => {
    const { text, href, target="_self" } = props;

    return (
      <Link href={href} target={target} className="bg-gradient-to-t from-blue4 to-blue3 text-white rounded-lg px-8 py-2">
        {text}
      </Link>
    )
    
  };
  
  export default ActionButton;
  
{/*
<ActionButton text="Click me!" href="https://google.com" target="_blank" /> 
<ActionButton text="Jump to Section 2" href="#section-2" /> 
*/}