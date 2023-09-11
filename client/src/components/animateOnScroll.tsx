import { useId, useEffect } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[] | string
}

const AnimateOnScroll = ({ children }: Props) => {
  const id = useId();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      })
    });
    const hiddenDiv = document.querySelector(`#${id}`);
    if(hiddenDiv) {
      observer.observe(hiddenDiv);
    }
  }, []);

  return (
    <div id={id}>
      {children}
    </div>
  )
}

export default AnimateOnScroll