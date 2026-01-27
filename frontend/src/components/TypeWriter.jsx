
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Typewriter = ({
  words,
  speed = 100,
  delay = 1500,
}) => {
  const [text] = useTypewriter({
    words,
    loop: true,
    typeSpeed: speed,
    deleteSpeed: 50,
    delaySpeed: delay,
  });

  return (
    <span className="text-black-500 font-bold w-20 h-20">
      {text}
      <Cursor />
    </span>
  );
};

export default Typewriter;