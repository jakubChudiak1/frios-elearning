const Section = (props) => {
  return (
    <section className="relative mt-0 flex min-h-screen w-full flex-col overflow-hidden ">
      {props.children}
    </section>
  );
};
export default Section;
