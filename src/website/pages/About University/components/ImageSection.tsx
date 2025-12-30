import image from "../../../../assets/university_image.png";
export function ImageSection() {
  return <>
    <div className=" max-w-7xl py-5 m-auto flex justify-center">
      <img src={image} alt="" />
    </div>
  </>;
}