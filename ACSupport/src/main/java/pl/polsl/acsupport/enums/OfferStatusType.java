package pl.polsl.acsupport.enums;

public enum OfferStatusType {
    OFERTA_PRZYJETA("Oferta przyjęta"),

    OFERTA_ODRZUCONA("Oferta odrzucona"),

    WYMAGANE_ZMIANY("Wymagane zmiany"),

    NOWA_OFERTA("Nowa oferta"),
    W_PRZYGOTOWANIU("W przygotowaniu");

    public final String label;

    private OfferStatusType(String label) {
        this.label = label;
    }
}
