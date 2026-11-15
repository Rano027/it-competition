<?php

declare(strict_types=1);

namespace App\Enums;

enum CompetitionCategory: string
{
    case UiUx = 'ui_ux';
    case WebDevelopment = 'web_development';
    case Lkti = 'lkti';
    case Poster = 'poster';

    public function label(): string
    {
        return match ($this) {
            self::UiUx => 'UI/UX Design',
            self::WebDevelopment => 'Web Development',
            self::Lkti => 'LKTI',
            self::Poster => 'Desain Poster',
        };
    }

    /**
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
