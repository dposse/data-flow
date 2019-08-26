//react hook - out here, following recipe usehooks.com/useKeyPress
const useKeyPress = (targetKey) => {
  //set hooks for moving left and right - a, d (from wasd), left, or right
  const [keyPressed, setKeyPressed] = useState(false);

  //event listeners
  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }
  
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    }

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  }, [setKeyPressed, targetKey]); //empty array => effect only run on mount/unmount

  return keyPressed;
}

export default useKeyPress;

// example of using hook below
  // //set keypresses to look out for - left here in case i allow human players
  // const aKey = useKeyPress('a');
  // const dKey = useKeyPress('d');
  // const leftKey = useKeyPress('ArrowLeft');
  // const rightKey = useKeyPress('ArrowRight');

  // human movement - not currently used but leaving for the option
// const sendLeftInput = () => {
//   console.log(`sending left input to server`);
//   socket.emit('move-left');
// };

// const sendRightInput = () => {
//   console.log(`sending right input to server`);
//   socket.emit('move-right');
// };