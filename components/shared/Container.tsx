interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <section className={`w-10/12 mx-auto ${className ?? ""}`}>
      {children}
    </section>
  );
};

export default Container;
