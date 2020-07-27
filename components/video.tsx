export default function Video() {
    return <div className='Container'>
        <video autoPlay={true} loop={true} muted className='Video' >
            <source src={"/videos/network2.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
        </video>


        <style jsx>{`
      .Container {
    position: relative;
    min-height: 300px;
    max-height: 100%;
    overflow: hidden;
    text-align: center;

                margin: auto;
                width: 640;
                padding: 10px;
            }
       .Video {
    width: 100%;
    height: 100%;
  }
            `
        }
        </style>

    </div>}