import { BusinessAbout } from "./(components)/BusinessAbout";
import { BusinessTitle } from "./(components)/BusinessTitle";
import { HeaderImage } from "./(components)/HeaderImage";
import { Reviews } from "./(components)/ReviewList";
import { ServicesDisplay } from "./(components)/ServicesDisplay";

export default function Profile() {
  const businessTitle = "Fade City";
  const about =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget turpis nec mauris ullamcorper fermentum id vel quam. Sed vehicula lectus ut tellus varius, non dictum justo ullamcorper. Proin euismod arcu vel nulla dignissim, vel tincidunt ipsum tristique. Aliquam erat volutpat. Vestibulum nec dui eget ligula luctus accumsan. Curabitur auctor, elit ut varius volutpat, ipsum tortor cursus justo, at ultricies diam ipsum ac libero. Etiam ullamcorper velit eu dui luctus, a fermentum mauris congue. Quisque ut risus non felis fermentum dapibus. Vivamus vel ultrices elit.";

  return (
    <div className="flex flex-col gap-8 pb-6">
      <HeaderImage />
      <BusinessTitle title={businessTitle} />
      <BusinessAbout businessTitle={businessTitle} about={about} />
      <ServicesDisplay />
      <Reviews />
    </div>
  );
}
