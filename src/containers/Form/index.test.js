import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // Attend qu'une la condition d'envoie avec "Envoyer" soit satisfaite avant de continuer avec le test
      await waitFor(() => {
        expect(screen.findByText("Envoyer"));
      }, { timeout: 3000 });
      // Attend que onSuccess soit appelé de manière asynchrone après le clic sur le bouton de soumission.
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      }, { timeout: 3000 });
    });
  });
});
