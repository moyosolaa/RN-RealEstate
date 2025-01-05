import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    label: string;
    icon?: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    label,
    icon,
    className,
    ...props
}: ButtonProps) {
    const baseStyles = 'rounded-full flex-row items-center justify-center';
    const variants = {
        primary: 'bg-purple-500',
        secondary: 'bg-gray-100',
        outline: 'border border-gray-200 bg-white'
    };

    const sizes = {
        sm: 'px-4 py-2',
        md: 'px-6 py-3',
        lg: 'px-6 py-4'
    };

    return (
        <TouchableOpacity
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {icon && <View>{icon}</View>}
            <Text className={`font-medium ${variant === 'primary' ? 'text-white' : 'text-gray-900'}`}>
                {label}
            </Text>
        </TouchableOpacity>
    );
} 