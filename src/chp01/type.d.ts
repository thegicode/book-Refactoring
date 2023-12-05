type TInvoices = {
    customer: string;
    performances: Performance[];
};

type TPerformance = {
    playID: string;
    audience: number;
};

type TPlay = {
    name: string;
    type: string;
};

type TPlays = {
    [key: string]: Play;
};

type TCreatedData = {};
