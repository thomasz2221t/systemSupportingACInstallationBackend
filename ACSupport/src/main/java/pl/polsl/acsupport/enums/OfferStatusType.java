package pl.polsl.acsupport.enums;

public enum OfferStatusType {
    ACCEPTED("Oferta przyjęta"),

    REJECTED("Oferta odrzucona"),

    CHANGES_REQUIRED("Wymagane zmiany"),

    IN_PROGRESS("W przygotowaniu");

    public final String label;

    private OfferStatusType(String label) {
        this.label = label;
    }
}
