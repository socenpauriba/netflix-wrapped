import { toPng } from "html-to-image";

export const exportToImage = async (element: HTMLElement): Promise<void> => {
  try {
    const clonedElement = element.cloneNode(true) as HTMLElement;

   
    Object.assign(clonedElement.style, {
      width: "1080px",
      height: "1920px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      padding: "32px",
      margin: "0",
    });
    
    const netflixWrappedTitle = clonedElement.querySelectorAll(
      "h2.title-wrapped"
    ) as NodeListOf<HTMLElement>;


    netflixWrappedTitle.forEach((el) => {
      Object.assign(el.style, {
        fontSize: "50px",
        width: "800px",
        height: "80px",
        padding: "10px",
        lineHeight: "1",
      });
    });

    const promoContainer = clonedElement.querySelectorAll(".do-it") as NodeListOf<HTMLElement>;

    promoContainer.forEach((el) => {
      Object.assign(el.style, {
        fontSize: "30px",
      })
    })

    const cardVisualizations = clonedElement.querySelectorAll(
      ".stat-card-visualizations"
    ) as NodeListOf<HTMLElement>;

    cardVisualizations.forEach((el) => {
      Object.assign(el.style, {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      });

      const textElementsVisualizations = el.querySelectorAll("h3");
      textElementsVisualizations.forEach((children) => {
        if (children instanceof HTMLElement) {
          Object.assign(children.style, {
            display: "block",
            textAlign: "center",
            lineHeight: "1.5",
            fontSize: "30px",
            color: "black",
          });
        }
      });
    });

    const cardTopList = clonedElement.querySelectorAll(
      ".stat-card-top-list"
    ) as NodeListOf<HTMLElement>;

    cardTopList.forEach((el) => {
      Object.assign(el.style, {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "40px",
        fontWeight: "bold",
      });

      const textElementsTopList = el.querySelectorAll("span");
      textElementsTopList.forEach((text) => {
        Object.assign(text.style, {
          display: "block",
          textAlign: "center",
          lineHeight: "1.5",
          fontSize: "30px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: "600px",
        });
      });

      const textElementsEpisodes = el.querySelectorAll("p");
      textElementsEpisodes.forEach((text) => {
        Object.assign(text.style, {
          display: "block",
          lineHeight: "1.2",
          fontSize: "30px",
        });
      });
    });

    const cardMarathons = clonedElement.querySelectorAll(
      ".stat-card-marathons"
    ) as NodeListOf<HTMLElement>;

    cardMarathons.forEach((el) => {
      Object.assign(el.style, {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
      });

      const textElementsMarathonsDate = el.querySelectorAll("p");
      textElementsMarathonsDate.forEach((text) => {
        Object.assign(text.style, {
          display: "block",
          lineHeight: "1.2",
          fontSize: "20px",
          overflow: "hidden",
        });
      });

      const textElementsMarathonsEpisodes = el.querySelectorAll("span");
      textElementsMarathonsEpisodes.forEach((text) => {
        Object.assign(text.style, {
          display: "block",
          lineHeight: "1.2",
          fontSize: "20px",
          overflow: "hidden",
        });
      });

      const textElementsTitleMarathons = el.querySelectorAll("h4");
      textElementsTitleMarathons.forEach((text) => {
        Object.assign(text.style, {
          display: "block",
          lineHeight: "1.5",
          fontSize: "30px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: "600px",
        });
      });
    });


    document.body.appendChild(clonedElement);

    const dataUrl = await toPng(clonedElement, {
      quality: 1,
      pixelRatio: 2,
    });
    
    document.body.removeChild(clonedElement);

    const link = document.createElement("a");
    link.download = "Netflix-wrapped.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error generando la imagen:", error);
    throw new Error("No se pudo generar la imagen");
  }
};
