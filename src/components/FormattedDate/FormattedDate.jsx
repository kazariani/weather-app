import React from "react";
import { DateTime } from "luxon";

export default function FormattedDate(props) {
    return (
        <div>
            {DateTime.fromMillis(props.date * 1000).setZone(props.timezone).toFormat("cccc HH:mm")}
        </div>
    );
}