
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


{/* Typewriter 
                <div className="flex-1 mx-2 text-center overflow-hidden">
                    <div className="text-xs md:text-lg font-semibold truncate">
                        <TypeWriter
                            words={[
                                "Welcome to Kit Event",
                                "Developer Name",
                                "BACKEND: Bhavesh Yadav",
                                "FRONTEND: ARON MUKTAN",
                                "UI/UX Designer: Nami Aktar Khan",
                                "Memories for Lifetime"
                            ]}
                        />
                    </div>
                </div>

                */}

