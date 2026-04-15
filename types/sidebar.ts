export interface SidebarProps {
	activeChat: string;
	setActiveChat: (id: string) => void;
	isMobile: boolean;
	isOpen: boolean;
	onClose: () => void;
}

export interface User {
	id: string;
	name: string;
	avatar: string;
	role: string;
}

export interface Chat {
	id: string;
	other_user: {
		avatar: string;
		email: string;
		id: string;
		name: string;
		role: string;
	};
}
