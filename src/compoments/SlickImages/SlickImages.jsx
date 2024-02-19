import Slider from "react-slick";

function SlickImages({ imgaes }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Tự động trượt
    autoplaySpeed: 1000, // Thời gian giữa các lần trượt (1 giây)
  };

  return (
    <div>
      
      <Slider {...settings}>
        {imgaes.map((item, index) => {
          return (
            <div key={index}>
              <img  
              className="w-full max-h-[500px]"
              src={item} alt=""  />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SlickImages;
