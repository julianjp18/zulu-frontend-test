import { Button as ButtonUI } from 'antd';

interface ButtonI {
    text: string;
    onClick: () => void;
    type?: 'primary' | 'default' | 'dashed' | 'link';
    block?: boolean;
}

const Button = ({
    text,
    onClick,
    type = 'primary',
    block = false,
}: ButtonI) => {
    return (
        <ButtonUI type={type} block={block} onClick={onClick}>
            {text}
        </ButtonUI>
    )
};

export default Button;