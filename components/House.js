/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function House(props) {
    return (
        <Link href={'/houses/[id]'} as={'/houses/' + props.id}>
            <a>
                <img src={props.picture} width='100%' alt='House picture'/>
                <p>
                    {props.type} - {props.town}
                </p>
                <p>{props.title}</p>
            </a>
        </Link>
    )
}