import MainDemo from "../../components/demo/Main"

const Demo = () => (
  <div>
    <MainDemo />
    <style jsx global>
      {`
        .demo-tablist {
          opacity: 0;
        }
      `}
    </style>
  </div>
)
export default Demo
